import { useLocalSearchParams } from "expo-router";
import React from "react";

function SubjectCategoryId() {
  const params = useLocalSearchParams();
  const paramsId = params.id as string;
  const paramsIdString = paramsId.toString();
  const paramsCategoryID = paramsIdString.split("/");

  console.log(paramsCategoryID);
  console.log(params.id);

  return <div>SubjectCategoryId</div>;
}

export default SubjectCategoryId;
