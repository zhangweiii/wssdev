import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  PlayIcon,
  StopIcon,
  TrashIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import useStore from '../store';
import { ConnectionStatus, Signal } from '../types';
import MessageList from '../components/MessageList';

export default function WebSocketTestPage() {
  const navigate = useNavigate();
  const {
    currentProject,
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    messages,
    clearMessages,
    signals,
  } = useStore();

  const [messageInput, setMessageInput] = useState('');
  const [showSignalSelector, setShowSignalSelector] = useState(false);

  // 根据当前项目过滤信令
  const filteredSignals = currentProject
    ? signals.filter((signal) => signal.projectId === currentProject.id)
    : [];

  // 根据连接状态确定按钮状态
  const isConnected = connectionStatus === ConnectionStatus.CONNECTED;
  const isConnecting = connectionStatus === ConnectionStatus.CONNECTING;
  const isError = connectionStatus === ConnectionStatus.ERROR;

  // 当用户选择项目时，自动连接
  useEffect(() => {
    if (currentProject && connectionStatus === ConnectionStatus.DISCONNECTED) {
      connect(currentProject.websocketUrl);
    }
  }, [currentProject, connectionStatus, connect]);

  // 发送消息
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sendMessage(messageInput);
    setMessageInput('');
  };

  // 选择信令
  const handleSelectSignal = (signal: Signal) => {
    setMessageInput(signal.payload);
    setShowSignalSelector(false);
  };

  // 连接/断开WebSocket
  const handleConnectionToggle = () => {
    if (isConnected) {
      disconnect();
    } else if (currentProject) {
      connect(currentProject.websocketUrl);
    }
  };

  if (!currentProject) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-medium text-gray-900">未选择项目</h2>
        <p className="mt-1 text-sm text-gray-500">请先选择或创建一个项目</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            <ArrowPathIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            前往项目管理
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="flex flex-col h-full">
        {/* 头部信息 */}
        <div className="mb-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">WebSocket测试</h1>
              <p className="mt-2 text-sm text-gray-700 flex items-center">
                连接地址: {currentProject.websocketUrl}
                <a
                  href={currentProject.websocketUrl.replace('ws://', 'http://').replace('wss://', 'https://')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-primary-600 hover:text-primary-500"
                >
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </p>
            </div>
            <div className="mt-4 flex items-center sm:mt-0 space-x-3">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  isConnected
                    ? 'bg-green-100 text-green-800'
                    : isConnecting
                    ? 'bg-yellow-100 text-yellow-800'
                    : isError
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {isConnected
                  ? '已连接'
                  : isConnecting
                  ? '连接中...'
                  : isError
                  ? '连接失败'
                  : '未连接'}
              </span>
              <button
                type="button"
                onClick={handleConnectionToggle}
                disabled={isConnecting}
                className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                  isConnected
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'bg-green-600 text-white hover:bg-green-500'
                } disabled:opacity-50`}
              >
                {isConnected ? (
                  <>
                    <StopIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    断开连接
                  </>
                ) : (
                  <>
                    <PlayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    {isConnecting ? '连接中...' : '连接'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={clearMessages}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                清空消息
              </button>
            </div>
          </div>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-hidden bg-gray-50 rounded-lg shadow mb-4">
          <div className="h-full overflow-y-auto p-4 max-w-full">
            <MessageList messages={messages} />
          </div>
        </div>

        {/* 发送区域 */}
        <div className="bg-white shadow rounded-lg p-4">
          <form onSubmit={handleSendMessage} className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                发送消息
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSignalSelector(!showSignalSelector)}
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <DocumentTextIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
                  选择信令
                </button>

                {showSignalSelector && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        已保存的信令
                      </div>
                      {filteredSignals.length > 0 ? (
                        <div className="max-h-60 overflow-y-auto">
                          {filteredSignals.map((signal) => (
                            <button
                              key={signal.id}
                              type="button"
                              onClick={() => handleSelectSignal(signal)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <div className="font-medium truncate">{signal.name}</div>
                              {signal.description && (
                                <div className="text-xs text-gray-500 truncate">{signal.description}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          暂无信令，请先添加信令
                        </div>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowSignalSelector(false);
                          navigate('/signals');
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-gray-100"
                      >
                        管理信令
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-1 flex">
              <textarea
                name="message"
                id="message"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 font-mono text-sm whitespace-pre-wrap break-all"
                placeholder='{"type": "message", "content": "Hello, WebSocket!"}'
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!isConnected || !messageInput.trim()}
                className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
              >
                发送
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
