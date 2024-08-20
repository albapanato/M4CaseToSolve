"use client";
import ClientID from "@/app/components/ClientID";
//import ShowClient from "@/app/components/ShowClient";

function ShowInfo({ params }) {
  //console.log(props)
  console.log("params", params);

  return (
    <div className="grid grid-cols-2">
      {/* <div>
        <ShowClient />
      </div> */}
      <div>
        <ClientID id={params.id} />
      </div>
    </div>
  );
}
export default ShowInfo;
