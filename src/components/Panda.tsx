import classNames from 'classnames'
import React from 'react'
import styles from './Panda.module.css'

export const Panda = () => {
  return (
    <div className={styles['panda']}>
      <div className={styles['panda-inner']}>
        <div className={styles['panda-head']}>
          <div
            className={classNames(
              styles['panda-head-body'],
              styles.transitions
            )}
          />

          <div
            className={classNames(
              styles['panda-head-face'],
              styles.transitions
            )}
          >
            <div className={styles['panda-head-face-left-eye']} />
            <div className={styles['panda-head-face-right-eye']} />

            <div className={styles['panda-head-face-nose']}>
              <div className={styles['panda-head-face-nose-colour']} />
              <div className={styles['panda-head-face-nose-mask']} />
            </div>
          </div>

          <div
            className={classNames(
              styles['panda-head-left-ear'],
              styles.transitions
            )}
          >
            <div className={styles['panda-head-left-ear-ear']} />
            <div className={styles['panda-head-left-ear-mask']} />
          </div>

          <div
            className={classNames(
              styles['panda-head-right-ear'],
              styles.transitions
            )}
          />
        </div>

        <div className={styles['panda-torso']}>
          <div
            className={classNames(
              styles['panda-torso-body'],
              styles.transitions
            )}
          />

          <div
            className={classNames(
              styles['panda-torso-left-arm'],
              styles.transitions
            )}
          >
            <div className={styles['panda-torso-left-arm-top']} />
            <div className={styles['panda-torso-left-arm-bottom']} />
            <div className={styles['panda-torso-left-arm-mask']} />
          </div>

          <div
            className={classNames(
              styles['panda-torso-right-arm'],
              styles.transitions
            )}
          >
            <div className={styles['panda-torso-right-arm-top']} />
            <div className={styles['panda-torso-right-arm-bottom']} />
            <div className={styles['panda-torso-right-arm-masktop']} />
            <div className={styles['panda-torso-right-arm-maskbottom']} />
          </div>

          <div
            className={classNames(
              styles['panda-torso-left-foot'],
              styles.transitions
            )}
          >
            <div className={styles['panda-torso-left-foot-left']} />
            <div className={styles['panda-torso-left-foot-middle']} />
            <div className={styles['panda-torso-left-foot-right']} />
            <div className={styles['panda-torso-left-foot-masktop']} />
            <div className={styles['panda-torso-left-foot-maskbottom']} />
          </div>

          <div
            className={classNames(
              styles['panda-torso-right-foot'],
              styles.transitions
            )}
          >
            <div className={styles['panda-torso-right-foot-left']} />
            <div className={styles['panda-torso-right-foot-right']} />
            <div className={styles['panda-torso-right-foot-mask']} />
          </div>
        </div>
      </div>
    </div>
  )
}
