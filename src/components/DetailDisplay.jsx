import { baseImgUrl } from "../constants";

const DetailDisplay = ({ title, data }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="flex gap-5">
        {data.map((item, index) =>
          item.logo_path ? (
            <div key={index} className="bg-white py-1 px-2 rounded-md">
              <img
                className="w-[100px] h-[40px] object-contain"
                src={baseImgUrl + item.logo_path}
                alt=""
              />
            </div>
          ) : (
            <span key={index} className="border py-1 px-2 rounded">
              {item.name}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default DetailDisplay;
