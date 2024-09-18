const Label = ({ name, type }: { name: string; type: string }) => {
  return (
    <span>
      <strong>{name}</strong>
      <span style={{ color: '#999' }}>[{type}]</span>
    </span>
  );
};
export default Label;
