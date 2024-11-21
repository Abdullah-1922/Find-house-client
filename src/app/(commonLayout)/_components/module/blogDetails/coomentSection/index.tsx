import { Comment } from './comment';
import { CommentForm } from './commentForm';

export default function CommentSection() {
  const comments = [
    {
      name: 'Mario Smith',
      date: 'Jun 23, 2020',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatarUrl: '/placeholder.svg?height=48&width=48',
    },
    {
      name: 'Mary Tyron',
      date: 'Jun 23, 2020',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatarUrl: '/placeholder.svg?height=48&width=48',
    },
    {
      name: 'Leo Williams',
      date: 'Jun 23, 2020',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatarUrl: '/placeholder.svg?height=48&width=48',
    },
  ];

  return (
    <div className=" my-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {`${comments.length} Comments`}
        <div className="h-1 w-12 bg-gray-800 mt-1" />
      </h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
      <h3 className="text-xl font-bold mt-8 mb-4">Leave a Comment</h3>
      <CommentForm />
    </div>
  );
}
