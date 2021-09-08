import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";

const Home: NextPage = () => {
  // 7カフェ高級キリマンジャロブレンド アイスL
  const texture = "/coffee-cup.png"

  const calc = (price: number): number => {
    const base_price: number = 195;
    return Math.round(price / base_price * 10) / 10;
  }
  let [price, setPrice] = useState(0);

  const convertZenkaku2Hankaku = (arg: string): string => {
    const res = arg.replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    })
    return res
  }

  const inputValidator = (arg: string): boolean => {
    const numArg = priceWrapper(arg)
    if (!isFinite(numArg)) return false
    if (numArg >= 100000000) return false
    return true;
  }

  const priceWrapper = (arg: string): number => {
    const hankakuArg = convertZenkaku2Hankaku(arg)
    return Number(hankakuArg)
  }

  const resultImage = (num: number, width: number, height: number): any => {
    let res = []
    const ratio = num - Math.floor(num)
    for (let i = 1; i <= num; i++) {
      if (i > 100) {
        res.push(<p className="align-middle inline">and more...</p>)
        return res
      }
      res.push(<Image className="justify-around" src={texture} layout="fixed" width={width} height={height} />)
    }
    res.push(<Image className="p-10" src={texture} layout="fixed" width={width * ratio} height={height * ratio} />)
    return res
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>N-Coffee</title>
        <meta name="description" content="Simplify your money worries" />
        <link rel="icon" href={texture} />
      </Head>

      <main className="max-w-3xl max-h-full min-h-9">
        <h1 className={styles.title}>
          {price.toLocaleString()} 円はコーヒー <span className="text-8xl">{calc(price).toLocaleString()}</span> 杯分
        </h1>

        <div className="my-8 text-center">
          Price: <input name="name" type="price" value={price} onChange={(e) => { if (inputValidator(e.target.value)) { setPrice(priceWrapper(e.target.value)) } }} />
        </div>
        <hr className="pb-5" />
        <div className="max-h-80 overflow-scroll">
          <div className="grid grid-cols-7 gap-8">
            {resultImage(calc(price), 64, 64)}
          </div>
        </div>

      </main >

      <footer className={styles.footer}>
        <a
          href="https://nagu.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by nagu.dev
        </a>
      </footer>
    </div >
  )
}

export default Home
