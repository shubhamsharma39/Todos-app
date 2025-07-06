import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import AddTodo from "../components/AddTodo";

afterEach(()=>{
    cleanup();
    jest.resetAllMocks();
})

describe("Testing the Todo Item component", () => {
    const mockTodo = { _id: "1", title: "New Todo", completed: false };

    test("check if the todo title gets rendered", () => {
        render(<TodoItem todo={mockTodo} />);
        expect(screen.getByText("New Todo")).toBeInTheDocument();
    });

    // More tests can be added here
});
