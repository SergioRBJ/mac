const UserDetails = ({ name, email, description }) => {
  return (
    <div className="flex items-center py-1">
      <div className="flex flex-col">
        <span className="text-md text-gray-800">{name}</span>
        {email && <span className="text-sm text-gray-600">{email}</span>}
        {description && (
          <span className="text-sm text-gray-500 mt-1">{description}</span>
        )}
      </div>
    </div>
  );
};

export { UserDetails };
