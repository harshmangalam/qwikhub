export const InfoItem = ({
  icon,
  link,
  text,
}: {
  icon: any;
  link?: any;
  text: any;
}) => (
  <div class="flex items-center space-x-2">
    {icon}
    {link ? (
      <a
        href={link}
        target="_blank"
        class="text-gray-700 hover:text-blue-500 hover:underline"
      >
        {text}
      </a>
    ) : (
      <p class="text-gray-700">{text}</p>
    )}
  </div>
);
