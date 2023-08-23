export const Light = ({ color }: { color: string | undefined }) => {
  return (
    <div
      className="light"
      style={{ backgroundColor: color || 'grey', color: color || 'grey' }}
    ></div>
  );
};
