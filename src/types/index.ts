// 定义项目类型
export interface Project {
  id: string;
  name: string;
  description?: string;
  websocketUrl: string;
  createdAt: number;
  updatedAt: number;
}

// 定义消息信令类型
export interface Signal {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  payload: string;
  createdAt: number;
  updatedAt: number;
}

// 定义WebSocket连接状态
export enum ConnectionStatus {
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  ERROR = "error",
}

// 定义WebSocket消息类型
export interface WebSocketMessage {
  id: string;
  type: "sent" | "received";
  content: string;
  timestamp: number;
}

// 定义应用状态存储类型
export interface AppState {
  // 项目状态
  projects: Project[];
  currentProject: Project | null;
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  updateProject: (id: string, project: Partial<Omit<Project, "id">>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (projectId: string | null) => void;
  
  // 信令状态
  signals: Signal[];
  addSignal: (signal: Omit<Signal, "id" | "createdAt" | "updatedAt">) => void;
  updateSignal: (id: string, signal: Partial<Omit<Signal, "id">>) => void;
  deleteSignal: (id: string) => void;
  
  // WebSocket连接状态
  connectionStatus: ConnectionStatus;
  socket: WebSocket | null;
  messages: WebSocketMessage[];
  connect: (url: string) => void;
  disconnect: () => void;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}
