import React from 'react'
import styles from './Index.module.css'
import { PageHeader } from '../src/components/PageHeader'
import { Panda } from '../src/components/Panda'
import BasicLayout from '../src/components/layout/BasicLayout'

export default function Index() {
  return (
    <BasicLayout>
      <div className={styles.wrapper}>
        <PageHeader isFullWidth />

        <div className={styles.content}>
          <Panda />
        </div>
      </div>
    </BasicLayout>
  )
}
