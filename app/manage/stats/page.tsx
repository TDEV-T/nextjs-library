"use client";
import { StatsModel } from "@/app/model/StatsModel";
import { getStats } from "@/app/service/stats";
import React, { useEffect, useState } from "react";

const Stats = () => {

 const [Stats, setStats] = useState<StatsModel | null>(null);

 const fetchStatsData = async () => {
    const data  = await getStats();

    setStats(data);
 }

  useEffect(() => {
    fetchStatsData();
  }, []);



  return (
    <div className="grid grid-cols-4 gap-4">

    


        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          Book Count : {Stats?.book}
        </div>

      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        Member Count : {Stats?.member}
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        Borrow Count : {Stats?.borrow}
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        Borrow not Return : {Stats?.borrowNotCompelete}
      </div>
    </div>
  );
};

export default Stats;
