import React from "react";

const GaleriCard = () => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl my-8 mx-2">
      <div className="card">
        <div className="card-body">
          {/* <h5 className="card-title">Video Player</h5> */}
          <div className="embed-responsive embed-responsive-9by16">
            <video controls className="embed-responsive-item rounded-xl">
              <source
                src="https://res.cloudinary.com/dap6ohre8/video/upload/v1711739071/Snapinsta.app_video_C644C2887826E2A4957E3879D298E5BF_video_dashinit_pzb2pt.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaleriCard;
