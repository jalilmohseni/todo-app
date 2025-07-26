export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type Action =
  | { type: "ADD"; payload: Task }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "UPDATE"; payload: { id: number; title: string } }
  | { type: "LOAD"; payload: Task[] };

export const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    case "UPDATE":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task
      );
    default:
      return state;
  }
};
