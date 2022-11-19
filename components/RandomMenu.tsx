import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../styles/RandomMenu.module.css';
import { main1, main2, vega, soup } from '../data.js';

const emptyData = [{
  name: '',
  img: '',
  recipe: '',
}, {
  name: '',
  img: '',
  recipe: '',
}, {
  name: '',
  img: '',
  recipe: '',
}, {
  name: '',
  img: '',
  recipe: '',
}, ]

type MenuItem = { name: string, img: string, recipe?: string }

const RandomMenu = () => {
  const [data, setData] = useState<MenuItem[]>(emptyData);
  const [lockIds, setLockIds] = useState<(MenuItem | null)[]>([null, null, null, null]);

  const genMenu = async () => {
    const dataWithLock = lockIds.map((item) => item === null ? emptyData[0] : item);
    setData(dataWithLock);

    await setTimeout(() => {
      const newData = [];

      if (!lockIds[0]) {
        const id1 = Math.floor(Math.random() * main1.length);
        newData.push(main1[id1]);
      } else {
        newData.push(lockIds[0]);
      }

      if (!lockIds[1]) {
        const id1 = Math.floor(Math.random() * main1.length);
        newData.push(main1[id1]);
      } else {
        newData.push(lockIds[1]);
      }

      if (!lockIds[2]) {
        const id1 = Math.floor(Math.random() * main1.length);
        newData.push(main1[id1]);
      } else {
        newData.push(lockIds[2]);
      }

      if (!lockIds[3]) {
        const id1 = Math.floor(Math.random() * main1.length);
        newData.push(main1[id1]);
      } else {
        newData.push(lockIds[3]);
      }

      setData(newData);
    }, 100);
  };

  const lock = (idx: number) => {
    const itemData = data[idx];
    const newLockIds = [...lockIds];
    newLockIds[idx] = itemData;
    setLockIds(newLockIds);
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['menu-wrapper']}>
        {
          data.map((item, index) => (
            <div
              key={index}
              className={styles['menu-item']}
              style={{
                backgroundImage: `url(${item.img})`,
              }}
              onClick={() => {
                if (lockIds[index]) {
                  window.open(item.recipe, '_blank')?.focus();
                }
                lock(index);
              }}
            >
              <div className={styles['menu-name-wrapper']}>
                <div className={styles['menu-name-backdrop']} />
                <div className={styles['menu-name']}>
                  {item.name}
                </div>
              </div>

              {lockIds[index] === null
                ? (
                  <div
                    className={styles['lock']}
                    onClick={() => lock(index)}
                  >
                    <Image
                      src="/heart-lock.png"
                      alt="lock"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : null
              }


              {
                lockIds[index]
                  ? (
                    <div className={styles['lock-badge']}>
                      <Image
                        src="/heart-lock.png"
                        alt="lock"
                        width={35}
                        height={35}
                      />
                    </div>
                  )
                  : null
              }
            </div>
          )) 
        }
      </div>
      <button className={styles['random-btn']} onClick={genMenu} >Get Menu</button>
    </div>
  );
};

export default RandomMenu;
