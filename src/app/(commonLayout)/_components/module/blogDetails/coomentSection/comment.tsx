'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TBlogComment } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useUser } from '@/hooks/user.hook';
import {
  useDeleteBlogCommentMutation,
  useUpdateBlogCommentMutation,
} from '@/redux/api/features/blog/blogCommentApi';

interface CommentProps {
  commentData: TBlogComment;
}

export function Comment({ commentData }: CommentProps) {
  const { comment, createdAt, userId, _id: commentId, blogId } = commentData;
  const { user } = useUser();
  const name = `${userId?.firstName} ${userId?.secondName}` || 'Anonymous';
  const avatarUrl = userId?.image || '/placeholder.svg';
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [updateBlogCommentFn, { isLoading: isUpdating }] =
    useUpdateBlogCommentMutation();
  const [deleteBlogCommentFn, { isLoading: isDeleting }] =
    useDeleteBlogCommentMutation();

  const handleUpdate = async () => {
    try {
      await updateBlogCommentFn({
        commentId,
        updatedData: { comment: editedComment, blogId },
      }).unwrap();
      setIsEditOpen(false);
      console.log('Comment updated successfully');
    } catch (error) {
      console.error('Failed to update comment', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlogCommentFn(commentId);
      setIsDeleteOpen(false);
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  return (
    <div className="flex gap-4 p-4 border-b text-gray-800">
      <Avatar className="w-12 h-12 flex-shrink-0">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start flex-grow">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900">{name}</h4>
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
          {user?._id === userId?._id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Edit className="mr-1 size-4 mb-0.5" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
                  <Trash className="mr-1 size-4 mb-0.5 text-red-500" />
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <span className="mt-2 text-gray-700">{comment}</span>
      </div>

      {/* Edit Comment Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>
              Make changes to your comment here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Comment Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
