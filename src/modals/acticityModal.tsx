import { useNavigate } from "react-router-dom";
export default function ActivityModal(props: any) {
  const navigate = useNavigate();
  const minutes = Math.floor(props.seconds / 60);
  const seconds = props.seconds - minutes * 60;
  return (
    <>
      <div className="fixed flex justify-center inset-0 items-center z-50 outline-none bg-transparent">
        <div className="bg-white w-80 text-center">
          <div className="text-2xl font-semibold py-3 bg-teal-300 ">
            modal header
          </div>
          <div className="p-5">
            <div>your session will expire in </div>
            <div className="font-thin text-5xl my-2 text-zinc-700">
              {`${minutes} min ${seconds} secs`}
            </div>
            <div>Please click "Continue" to keep working; </div>
            <div>or click "LogOut" to end your session.</div>
          </div>
          <div className="flex justify-center gap-8 mb-5">
            <div
              className="p-3 m-1 bg-teal-300 cursor-pointer"
              onClick={() => {
                props.setIsStay(false);
                props.setSeconds(120);
                props.setTimeOut(false);
              }}
            >
              Continue
            </div>
            <div
              className="p-3 m-1 bg-teal-300 cursor-pointer"
              onClick={() => {
                props.setIsStay(false);
                props.setTimeOut(false);
                navigate("/login");
              }}
            >
              LogOut
            </div>
          </div>
        </div>
      </div>
      <div className="fixed opacity-25 inset-0 z-40 bg-black" />
    </>
  );
}
