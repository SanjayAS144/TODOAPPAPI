import { Response, Request } from "express";
import { ITodo } from "types/todo";
import Todo from "../../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Sanjay")
    console.log(req.body)
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res
      .status(201)
      .json({ message: "Todo Added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const {
      params: { id },
      body,
    } = req;
    console.log(id)
    console.log(body)
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find();
    res
      .status(200)
      .json({ message: "ToDo Updated", todo: updateTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: any | null = await Todo.findByIdAndDelete(req.params.id);
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
