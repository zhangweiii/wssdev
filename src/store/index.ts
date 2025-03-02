import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { AppState, ConnectionStatus, Project, Signal, WebSocketMessage } from '../types';

// 创建全局状态存储
const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 项目状态管理
      projects: [],
      currentProject: null,
      
      addProject: (project) => {
        const newProject: Project = {
          id: uuidv4(),
          ...project,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          projects: [...state.projects, newProject],
          currentProject: state.projects.length === 0 ? newProject : state.currentProject
        }));
      },
      
      updateProject: (id, project) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, ...project, updatedAt: Date.now() }
              : p
          ),
          currentProject: state.currentProject?.id === id
            ? { ...state.currentProject, ...project, updatedAt: Date.now() }
            : state.currentProject
        }));
      },
      
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProject: state.currentProject?.id === id ? null : state.currentProject,
          signals: state.signals.filter((s) => s.projectId !== id)
        }));
      },
      
      setCurrentProject: (projectId) => {
        if (projectId === null) {
          set({ currentProject: null });
          return;
        }
        
        const project = get().projects.find((p) => p.id === projectId) || null;
        set({ currentProject: project });
      },
      
      // 信令状态管理
      signals: [],
      
      addSignal: (signal) => {
        const newSignal: Signal = {
          id: uuidv4(),
          ...signal,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          signals: [...state.signals, newSignal]
        }));
      },
      
      updateSignal: (id, signal) => {
        set((state) => ({
          signals: state.signals.map((s) =>
            s.id === id
              ? { ...s, ...signal, updatedAt: Date.now() }
              : s
          )
        }));
      },
      
      deleteSignal: (id) => {
        set((state) => ({
          signals: state.signals.filter((s) => s.id !== id)
        }));
      },
      
      // WebSocket连接状态管理
      connectionStatus: ConnectionStatus.DISCONNECTED,
      socket: null,
      messages: [],
      
      connect: (url) => {
        // 先断开现有连接
        const currentSocket = get().socket;
        if (currentSocket) {
          currentSocket.close();
        }
        
        set({ connectionStatus: ConnectionStatus.CONNECTING });
        
        try {
          const socket = new WebSocket(url);
          
          socket.onopen = () => {
            set({ 
              connectionStatus: ConnectionStatus.CONNECTED,
              socket
            });
          };
          
          socket.onmessage = (event) => {
            const message: WebSocketMessage = {
              id: uuidv4(),
              type: "received",
              content: event.data,
              timestamp: Date.now()
            };
            
            set((state) => ({
              messages: [...state.messages, message]
            }));
          };
          
          socket.onerror = () => {
            set({ connectionStatus: ConnectionStatus.ERROR });
          };
          
          socket.onclose = () => {
            set({ 
              connectionStatus: ConnectionStatus.DISCONNECTED,
              socket: null
            });
          };
          
        } catch (error) {
          set({ 
            connectionStatus: ConnectionStatus.ERROR,
            socket: null
          });
        }
      },
      
      disconnect: () => {
        const socket = get().socket;
        if (socket) {
          socket.close();
        }
        
        set({
          socket: null,
          connectionStatus: ConnectionStatus.DISCONNECTED
        });
      },
      
      sendMessage: (content) => {
        const socket = get().socket;
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(content);
          
          const message: WebSocketMessage = {
            id: uuidv4(),
            type: "sent",
            content,
            timestamp: Date.now()
          };
          
          set((state) => ({
            messages: [...state.messages, message]
          }));
        }
      },
      
      clearMessages: () => {
        set({ messages: [] });
      }
    }),
    {
      name: 'websocket-manager-storage',
      partialize: (state) => ({
        projects: state.projects,
        signals: state.signals
      })
    }
  )
);

export default useStore;
