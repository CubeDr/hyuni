interface Props {
  params: {
    id: string;
  }
}

export default function Post({ params: { id } }: Props) {
  return (
    <div>
      Post {id}
    </div>
  );
}