type buttonInterface = {
  label: string;
};

const ButtonComponent = (props: buttonInterface) => {
  const { label } = props;
  return (
    <>
      <div className="float-right mb-3">
        <div className="flex item-center justify-center h-10 w-auto border-2 p-1 bg-lime-500 cursor-pointer">
          <div className="">
            <i className="fa-solid fa-plus text-white"></i>
          </div>
          <div className="">
            <span className="ml-2 text-white">{label}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonComponent;
