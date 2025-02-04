import { Popover } from "@headlessui/react";
import {
  DotsHorizontalIcon,
  BookmarkIcon,
  ExclamationIcon,
  BellIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { ReportTargetAPI } from "../pages/api/Helpers";

function PopOver({ targetId, targetType }) {
  var username = "61bb011b631b46d08adc16ec";
  const handleReport = async (e) => {
    try {
      const response = await axios({
        method: "put",
        url: ReportTargetAPI(username),
        data: {
          target_id: targetId,
          target_type: targetType,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const moreMenus = [
    {
      name: "Subscribe",
      description: "notify you the thread update",
      action: "",
      icon: IconSubscribe,
    },
    {
      name: "Bookmark",
      description: "added thread to your bookmark",
      action: "",
      icon: IconBookmark,
    },
    {
      name: "Report",
      description: "report the thread",
      action: handleReport,
      icon: IconReport,
    },
  ];

  return (
    <div>
      <Popover className="relative">
        <Popover.Button>
          {" "}
          <div className="flex cursor-pointer hover:bg-gray rounded">
            <DotsHorizontalIcon className="h-5 w-5" />
          </div>
        </Popover.Button>

        <Popover.Panel className="absolute z-10 bg-white shadow-md px-2 rounded-md transform -translate-x-full left-5">
          <div className="relative grid gap-1 my-1 ">
            {moreMenus?.map((item) => (
              <div
                key={item.name}
                className="flex items-center p-1.5 transition duration-150 ease-in-out rounded-lg hover:bg-gray gap-1"
                onClick={item.action}
              >
                <div className="flex items-center justify-center">
                  <item.icon aria-hidden="true" />
                </div>
                <div className="ml-1 sm:ml-0 w-max">
                  <p className="text-xs font-semibold text-grayTxt">
                    {item.name}
                  </p>
                  <p className="text-xs text-grayTxt">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function IconSubscribe() {
  return <BellIcon color="orange" width={21} height={21} />;
}

function IconBookmark() {
  return <BookmarkIcon color="gray" width={21} height={21} />;
}

function IconReport() {
  return <ExclamationIcon color="red" width={21} height={21} />;
}
export default PopOver;
