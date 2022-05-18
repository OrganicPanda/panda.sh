import create from 'zustand'
import produce from 'immer'
import equal from 'fast-deep-equal';

export const useQueueStore = create(set => ({
  queues: {},
  add: (fn, config, params = {}) => {
    const queueKey = config.name
    const setResponse = (index, response) => {
      set(produce(state => {
        state.queues[queueKey][index].response = response
      }))
    }
    const setError = (index, error) => {
      set(produce(state => { state.queues[queueKey][index].error = error }))
    }
    const setAborted = (index) => {
      set(produce(state => { 
        state.queues[queueKey][index].aborted = true 
        state.queues[queueKey][index].resolvedAt = performance.now()
      }))
    }
    const setResolved = (index) => {
      set(produce(state => { state.queues[queueKey][index].resolvedAt = performance.now() }))
    }

    set(
      produce(state => {
        if (!state.queues[queueKey]) {
          state.queues[queueKey] = []
        }

        let index = null
        const itemAbortController = new AbortController()
        const fnAbortController = new AbortController()
        itemAbortController.signal.addEventListener('abort', () => {
          fnAbortController.abort()
          setAborted(index)
        })
        const queueItem = {
          params,
          abortController: itemAbortController,
          equal: config.equal,
          createdAt: performance.now(),
          resolvedAt: null,
          error: null,
          response: null,
          aborted: false,
          promise: fn(params, { abortSignal: fnAbortController.signal })
            .then(response => setResponse(index, response))
            .catch(error => setError(index, error))
            .finally(() => setResolved(index))
        }

        index = state.queues[queueKey].push(queueItem) - 1
      })
    )
  }
}))

const isResolved = item => !!(item && (item.error || item.aborted || item.response))
const isResolvedSuccesfully = item => !!(item && (item.response))

const findQueueItem = (items, params) =>
  items.find(item => equal(params, item.params)) || null

export const useQueue = (fn, config = {}, params = {}) => {
  const queueKey = config.name || String(fn)
  const queue = useQueueStore(state => state.queues[queueKey])
  const add = useQueueStore(state => state.add)

  if (!queue || !findQueueItem(queue, params)) {
    add(fn, {
      name: queueKey
    }, params)
  }

  return queue
}

export const useNamedQueue = (fn, config, params) => {
  return useQueue(fn, config, params)
}

export const useLastGoodQueueItem = (queue, params) => {
  const requestedQueueItem = findQueueItem(queue, params)
  const goodItems = queue.filter(item => !!item.response)
  const lastGoodItem =
    goodItems.length > 0 ? goodItems[goodItems.length - 1] : null
  const requestedQueueItemResolved = requestedQueueItem
    ? isResolvedSuccesfully(requestedQueueItem)
    : false

  if (requestedQueueItemResolved) {
    return requestedQueueItem
  } else if (lastGoodItem) {
    return lastGoodItem
  }

  return null
}
