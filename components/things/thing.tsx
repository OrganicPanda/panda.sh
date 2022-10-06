import React, { useRef, useState, useEffect, useMemo } from "react";
import { createWorkerFactory, terminate } from "@shopify/web-worker";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CSGToBuffers } from "./CSGToBuffers";
import {
  useNamedQueue,
  useLastGoodQueueItem,
  QueueItemFunction,
  QueueConfig,
  QueueItemFunctionOverrides,
} from "../zust-queue/useQueue";

let key = 0;

const Thing = ({ buffers, scale, position, fill, modelId }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { vertices, indices } = buffers;

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  useEffect(() => {
    // If the modelId changes prompt Three to update the vertices
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  }, [modelId]);

  // Express that as something rect-three-fiber can render
  return (
    <mesh
      ref={meshRef}
      // TODO: why are the models so big?
      scale={scale / (active ? 10 : 12)}
      position={position}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
        <bufferAttribute
          array={indices}
          attach="index"
          count={indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      {/* Not sure exactly why flatShading is needed here */}
      <meshPhongMaterial color={hovered ? 0x00ff00 : fill} flatShading={true} />
    </mesh>
  );
};

const createWorker = createWorkerFactory(
  () => import("./examples/example.jscad.js")
);

const getParams = (defs, overrides = {}) => {
  return defs.reduce((acc, def) => {
    acc[def.name] = overrides[def.name] ? overrides[def.name] : def.initial;
    return acc;
  }, {});
};

interface GenerateModelOverrides extends QueueItemFunctionOverrides {
  wallThickness: number;
}

const generateModel = async (
  overrides: GenerateModelOverrides,
  { abortSignal }
) => {
  const timeStart = performance.now();
  let timeAfterWorkerKilled = timeStart;

  const worker = createWorker();
  abortSignal.addEventListener("abort", () => {
    // We can call terminate(worker) but the awaits never resolve/reject so
    // I have a feeling we would have a memory leak here
    terminate(worker);
  });

  const timeAfterWorkerCreated = performance.now();
  console.log(
    `--> Fancy Worker: worker created in ${
      timeAfterWorkerCreated - timeAfterWorkerKilled
    }ms`
  );

  const modelId = key++;

  const defs = await worker.getParameterDefinitions();
  const params = getParams(defs, overrides);
  const model = await worker.main(params);

  const timeAfterModelGenerated = performance.now();
  console.log(
    `--> Fancy Worker: model generated in ${
      timeAfterModelGenerated - timeAfterWorkerCreated
    }ms with overrides = ${JSON.stringify(overrides)}`
  );

  const buffers = CSGToBuffers(model);

  const end = performance.now();
  console.log(
    `--> Fancy Worker: converted model to threejs in ${
      end - timeAfterModelGenerated
    }ms`
  );

  terminate(worker);

  return { buffers, modelId };
};

const ThingWrapper = ({ wallThickness = 10, ...props }) => {
  const params = useMemo(() => ({ wallThickness }), [wallThickness]);
  const queue = useNamedQueue(
    generateModel,
    { name: "Generate <Thing /> Model" },
    params
  );
  const model = useLastGoodQueueItem(queue, params);

  if (!model || model.error) return null;

  return (
    <Thing
      buffers={model.response.buffers}
      modelId={model.response.modelId}
      {...props}
    />
  );
};

export default ThingWrapper;
