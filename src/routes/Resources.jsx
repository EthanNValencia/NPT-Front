import React, { useState } from "react";
import Article from "../components/Article";

const Resources = () => {
  const [hasApiError, setHasApiError] = useState(false);
  const [articleData, setArticleData] = useState([]);

  return (
    <div>
      Resources
      <div>
        <Article />
      </div>
    </div>
  );
};

export default Resources;
