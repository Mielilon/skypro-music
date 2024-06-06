type IconProps = {
  wrapperClass?: string;
  iconClass: string;
  name: string;
};

export default function Icon({
  wrapperClass = "",
  iconClass,
  name,
}: IconProps) {
  return (
    <div className={wrapperClass}>
      <svg className={iconClass}>
        <use xlinkHref={`/img/icon/sprite.svg#icon-${name}`} />
      </svg>
    </div>
  );
}
