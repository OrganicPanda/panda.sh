import React from 'react'
import { useQueueStore, useLastGoodQueueItem } from './useQueue'

export const QueueItem = ({ index, item }) => {
  let state = 'Pending'
  let action = (
    <button type="button" onClick={() => item.abortController.abort()}>Abort</button>
  )

  if (item.error) {
    state = `Error ${item.error}`
    action = null
  } else if (item.aborted) {
    state = `Aborted in ${Math.round(item.resolvedAt - item.createdAt) / 1000}s`
    action = null
  } else if (item.response) {
    state = `Complete in ${Math.round(item.resolvedAt - item.createdAt) / 1000}s`
    action = null
  }

  return (
    <p className='🐼-text'>
      Queue item {index}: Params {JSON.stringify(item.params)} {state} {action}
    </p>
  )
}

export const QueueItems = ({ queue }) => {
  return (
    <div>
      {queue.map((item, i) => (
        <QueueItem key={JSON.stringify(item.params)} index={i} item={item} />
      ))}
    </div>
  )
}

export const QueueLog = () => {
  const queues = useQueueStore(state => state.queues)

  return (
    <div>
      <h2 className='🐼-heading 🐼-heading-2'>Queues</h2>
      {Object.keys(queues).map(queueKey => (
        <React.Fragment key={queueKey}>
          <h3 className='🐼-heading 🐼-heading-3'>
            Queue <code>{queueKey}</code>
          </h3>
          <QueueItems queue={queues[queueKey]} />
        </React.Fragment>
      ))}
    </div>
  )
}
