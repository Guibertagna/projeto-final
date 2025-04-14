import { io } from "socket.io-client";
import { useOrder } from "@/stores/order";
import { useAuthenticateStore } from "@/stores/authenticate";


 const socket = io("http://35.196.79.227:8000", {
  path: "/socket",
  transports: ["websocket", "polling"],
  query: { user_id: 10},
});

socket.on("connect", () => {
  console.log("Conectado com sucesso!");
});

socket.on("new_order", (data) => {
  const order = useOrder()
  order.order_socket.push(data);
  console.log("New Order:", data);
});

socket.on("disconnect", () => {
  console.log("Desconectado.");
});
export default socket;