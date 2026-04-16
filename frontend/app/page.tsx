import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "./_pages/HomePage";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<main className="grow bg-gray-50" />}>
        <HomePage />
      </Suspense>
      <Footer />
    </>
  );
}
