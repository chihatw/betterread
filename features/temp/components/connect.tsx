"use client";

import { db } from "@/firebase/client";
import { doc, getDoc } from "@firebase/firestore";
import { useEffect } from "react";

const Connect = () => {
  useEffect(() => {
    const fetchData = async () => {
      const a = await getDoc(doc(db, "temp", "lisan"));
      console.log(a.data());
    };
    fetchData();
  }, []);
  return <div>Connect</div>;
};

export default Connect;
