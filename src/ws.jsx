import React, { useState, useEffect, useCallback, useRef } from "react";
import { Outlet } from "react-router-dom";

const URL = process.env.REACT_APP_WS_URL;

const Websocket = () => {
	const ws = useRef(null);
	const [isConnected, setIsConnected] = useState(false);

	const onWSOpen = useCallback(() => {
		setIsConnected(true);
		console.log("WS connected");
	}, []);

	const onWSClose = useCallback(() => {
		setIsConnected(false);
		console.log("WS disconnected");
	}, []);

	const onWSMessage = useCallback((dataStr) => {
		const data = JSON.parse(dataStr);
		if (data.members) {
			setMembers(data.members);
		} else if (data.publicMessage) {
			setChatRows((oldArray) => [
				...oldArray,
				<span>
					<b>{data.publicMessage}</b>
				</span>,
			]);
		} else if (data.privateMessage) {
			alert(data.privateMessage);
		} else if (data.systemMessage) {
			setChatRows((oldArray) => [
				...oldArray,
				<span>
					<i>{data.systemMessage}</i>
				</span>,
			]);
		}
	}, []);

	const onConnect = useCallback(() => {
		if (ws.current?.readyState !== WebSocket.OPEN) {
			ws.current = new WebSocket(URL);
			ws.current.addEventListener("open", onWSOpen);
			ws.current.addEventListener("close", onWSClose);
			ws.current.addEventListener("message", (event) => {
				onWSMessage(event.data);
			});
		}
	}, []);

	useEffect(() => {
		return () => {
			ws.current?.close();
		};
	}, []);

	const onSendMessage = useCallback(() => {
		ws.current?.send(
			JSON.stringify({
				type: "test",
				message: "test!",
			})
		);
	}, []);

	const onSendSubMessage = useCallback(() => {
		ws.current?.send(
			JSON.stringify({
				action: "sendPublic",
				message,
			})
		);
	}, []);

	const onDisconnect = useCallback(() => {
		if (isConnected) {
			ws.current?.close();
		}
	}, [isConnected]);

	return { isConnected: isConnected, onPublicMessage: onSendMessage, onPrivateMessage: onSendSubMessage, onConnect: onConnect, onDisconnect: onDisconnect };
};

export default Websocket;
