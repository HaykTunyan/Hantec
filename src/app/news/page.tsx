import React, { FC } from "react";
import Layout from "../dashboard/layout";

const NewsPage: FC = () => {
  /**
   * News Page Hooks.
   */

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-10">News</h1>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
