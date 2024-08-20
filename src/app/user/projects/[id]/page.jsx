"use client";
import ProjectID from "@/app/components/ProjectID";

//import ShowClient from "@/app/components/ShowClient";

function ShowProject({ params }) {
  //console.log(props)
  console.log("params", params);
  console.log("params.id: ", params.id);

  return (
    <div className="grid grid-cols-1">
      {/* <div>
        <ShowClient />
      </div> */}
      <div>
        <ProjectID id={params.id} />
      </div>
    </div>
  );
}
export default ShowProject;
