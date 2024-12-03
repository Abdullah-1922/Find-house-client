import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function InquiryForm() {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-semibold">Request Inquiry</h3>
      <hr />
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="agent">Select Agent</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agent1">Agent 1</SelectItem>
              <SelectItem value="agent2">Agent 2</SelectItem>
              <SelectItem value="agent3">Agent 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Write your message here..." />
        </div>
        <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900">
          Submit Request
        </Button>
      </form>
    </div>
  );
}
