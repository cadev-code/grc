type Props = {
  error: string;
  message: string;
};

export const ErrorMessage = ({ error, message }: Props) => {
  return (
    <div className="w-full text-red-500 border border-red-500 p-2 rounded-md">
      <p className="text-xs">{error || 'UNKNOWN_ERROR'}</p>
      <p>{message || 'Error desconocido'}</p>
    </div>
  );
};
