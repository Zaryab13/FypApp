import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { state } = useAuth();
  // console.log(state);

  const dob = new Date(state.dateOfBirth);
  const dateOfBirth = `${dob.getDate()}-${
    dob.getMonth() + 1
  }-${dob.getFullYear()}`;

  return (
    <section className="w-full py-4 px-2">
      <h1 className="font-medium text-2xl">Technician Name</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8 mt-4 px-4 py-4 rounded-xl shadow-[1px_1px_2px_1px_rgba(0,0,0,0.08),-1px_-1px_2px_1px_rgba(0,0,0,0.08)] max-w-[550px] min-w-fit border border-secondary bg-tertiary">
        <div className="min-w-[160px] w-[160px] h-[160px] bg-gray-600 rounded-full overflow-hidden"></div>
        <div className="self-start w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Personal Information</h2>
            <span className="py-1 px-2 bg-orange-500 text-white rounded-md capitalize ">
              {state.role}
            </span>
          </div>
          <div className="grid grid-cols-2 justify-between gap-4 py-2">
            <div>
              <h3 className="text-lg font-normal">Name</h3>
              <p>{state.fullName}</p>
            </div>
            <div>
              <h3 className="text-lg font-normal">Date of Birth</h3>
              <p>{dateOfBirth}</p>
            </div>
            <div>
              <h3 className="text-lg font-normal">Email</h3>
              <p>{state.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-normal">Cell</h3>
              <p>{state.cell}</p>
            </div>
            <div>
              <h3 className="text-lg font-normal">Gender</h3>
              <p>{state.gender}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
