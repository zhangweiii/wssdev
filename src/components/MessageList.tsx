import { useEffect, useRef } from 'react';
import { WebSocketMessage } from '../types';
import { ClockIcon } from '@heroicons/react/24/outline';

interface MessageListProps {
  messages: WebSocketMessage[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 格式化消息内容，尝试解析JSON
  const formatMessage = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return content;
    }
  };

  // 格式化时间戳
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">暂无消息记录</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto w-full">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col p-3 rounded-lg shadow-sm max-w-full ${
            message.type === 'sent'
              ? 'bg-primary-50 border-l-4 border-primary-500'
              : 'bg-white border-l-4 border-gray-500'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                message.type === 'sent'
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.type === 'sent' ? '已发送' : '已接收'}
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded whitespace-pre-wrap break-all overflow-x-auto max-w-full">
            {formatMessage(message.content)}
          </pre>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
