import React from 'react'
import { Vector3 } from 'three'

import { PageHeader } from '../src/components/PageHeader'
import { useCustomProperties } from '../src/hooks/useCustomProperties'
import { BasicLayout } from '../src/components/layout/BasicLayout'
import { ExampleScene } from '../src/components/3d/ExampleScene'
import { DebugBox } from '../src/components/3d/DebugBox'
import {
  AxisAlignment,
  withAxisAlignment
} from '../src/components/3d/utils/withAxisAlignment'
import { Anchor, Code } from '../src/components/Typography'
import { CodeBlockAcorn3 } from '../src/components/CodeBlockAcorn3'

const ExampleOne = () => {
  const { ref, customProperties } = useCustomProperties(['--🎨-art-accent'])
  const color = customProperties?.['--🎨-art-accent'] || 'green'

  return (
    <div ref={ref as React.Ref<HTMLDivElement>}>
      <ExampleScene>
        <DebugBox
          color={color}
          position={new Vector3(0, 0, 0)}
          size={[1, 1, 1]}
        />
      </ExampleScene>
    </div>
  )
}

const ExampleTwo = () => {
  const { ref, customProperties } = useCustomProperties([
    '--🎨-background',
    '--🎨-art-accent'
  ])

  return (
    <div ref={ref as React.Ref<HTMLDivElement>}>
      <ExampleScene>
        <group position={new Vector3(0, 0, 0)}>
          <DebugBox
            color={customProperties?.['--🎨-background'] || 'green'}
            position={new Vector3(0, 0, 0)}
            size={[1, 0.5, 0.5]}
          />

          <DebugBox
            color={customProperties?.['--🎨-art-accent'] || 'red'}
            position={withAxisAlignment({
              position: new Vector3(0, 0, 0),
              x: AxisAlignment.END,
              y: AxisAlignment.END,
              z: AxisAlignment.END,
              offsets: new Vector3(0.25, 0.25, 0.25),
              size: [0.5, 0.5, 0.5]
            })}
            size={[0.5, 0.5, 0.5]}
          />
        </group>
      </ExampleScene>
    </div>
  )
}

export const Summary = () => {
  return (
    <>
      In the world of <Anchor href="https://threejs.org">three.js</Anchor>{' '}
      everything is aligned centred on each axis by default. This means that if
      you place an object at a position of interest it will likely overlap
      something else in a way you did not intend it to. Let&apos;s see if we can
      fix it.
    </>
  )
}

export default function January2023() {
  const yo = 'yo'
  return (
    <BasicLayout>
      <PageHeader />

      <div className="🐼-section 🐼-section-hero">
        <div className="🐼-section-page">
          <div className="🐼-section-item">
            <h1 className="🐼-heading 🐼-heading-1">January 2023</h1>
            <p className="🐼-subheading">
              Getting aligned with <code className="🐼-code">three.js</code> and{' '}
              <code className="🐼-code">react-three-fiber</code>
            </p>
          </div>
        </div>
      </div>

      <div className="🐼-theme-happyhues-palettes-palette2 🐼-section">
        <div className="🐼-section-item 🐼-section-page-highlight">
          <ExampleOne />
        </div>
      </div>

      <div className="🐼-section">
        <div className="🐼-section-page 🐼-section-text">
          <h2 className="🐼-section-item 🐼-heading">
            The problem with alignment
          </h2>
          <p className="🐼-section-item 🐼-text">
            In the world of <a href="https://threejs.org">three.js</a>{' '}
            everything is aligned centred on each axis by default. This means
            that if you place an object at a position of interest it will likely
            overlap something else in a way you did not intend it to. In the
            above example I&apos;m rendering a simple box at position{' '}
            <Code>[0, 0, 0]</Code> and, as you can see, it appears to have sunk
            in to the floor. I suspect this is expected if you think in 3d but I
            don&apos;t so let&apos;s see if we can fix it.
          </p>
        </div>
      </div>

      <div className="🐼-theme-happyhues-palettes-palette2 🐼-section">
        <div className="🐼-section-item 🐼-section-page-highlight">
          <ExampleTwo />
        </div>
      </div>

      <div className="🐼-section">
        <div className="🐼-section-page 🐼-section-text">
          <CodeBlockAcorn3>{`
import * as React from "react";
import { HelloComponent } from "./hello";
import { NameEditComponent } from "./nameEdit";

export const App = () => {
  const [name, setName] = React.useState("defaultUserName");
  const [editingName, setEditingName] = React.useState("defaultUserName");

  const loadUsername = () => {
    setTimeout(() => {
      setName("name from async call");
      setEditingName("name from async call");
    }, 500);
  };

  React.useEffect(() => {
    loadUsername();
  }, []);

  const setUsernameState = () => {
    setName(editingName);
  };

  return (
    <>
      <HelloComponent userName={name} />
      <NameEditComponent
        initialUserName={\`hey\${yo}hey\`}
        editingName={editingName}
        onNameUpdated={setUsernameState}
        onEditingNameUpdated={setEditingName}
      />
    </>
  );
};
          `}</CodeBlockAcorn3>
        </div>
      </div>
    </BasicLayout>
  )
}
