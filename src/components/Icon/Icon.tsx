type IconProps = {
  wrapperClass?: string;
  iconClass: string;
  name: string;
  onClick?: () => void;
};

export default function Icon({
  wrapperClass = "",
  iconClass,
  name,
  onClick,
}: IconProps) {
  return (
    <div className={wrapperClass} onClick={onClick}>
      <svg className={iconClass}>
        <use xlinkHref={`/img/icon/sprite.svg#icon-${name}`} />
      </svg>
    </div>
  );
}
