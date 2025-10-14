import React from "react";
import PageTitle from "./PageTitle";

export default function PageHeading({ title, children }) {
  return (
    <div className="text-center mx-auto mb-8 max-w-2xl">
      <PageTitle title={title} />
      <p className="text-gray-600 font-primary">{children}</p>
    </div>
  );
}
