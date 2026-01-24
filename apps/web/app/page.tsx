import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { prisma } from "db/client";
import { Suspense } from "react";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.page}>
        <Homee />
      </div>
    </Suspense>
  );
}

async function Homee() {
  await new Promise(r => setTimeout(r, 10000))
  return <> <Data /></>
}

async function Data() {
  const users = await prisma.user.findMany();

  return <>{JSON.stringify(users)}</>
}
