import InfoToast from "@/components/InfoToast";

export const toastConfig = {
  info: (props: any) => <InfoToast text1={props.text1} />,
};
