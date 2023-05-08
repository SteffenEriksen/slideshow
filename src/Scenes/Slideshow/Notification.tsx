import "./slideshow.css";

export default function Notification(props: { show: boolean }) {
  const { show } = props;

  return (
    <div className={`noti ${show ? "noti-show" : "noti-hide"} `}>
      <div className="noti-content"></div>
    </div>
  );
}
