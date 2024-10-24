import { useState, useEffect } from "react";

const eventListeners = {};

export const useEvent = (eventName, callback) => {
  useEffect(() => {
    if (!eventListeners[eventName]) {
      eventListeners[eventName] = [];
    }
    eventListeners[eventName].push(callback);

    return () => {
      eventListeners[eventName] = eventListeners[eventName].filter(
        (listener) => listener !== callback
      );
    };
  }, [eventName, callback]);
};

export const emitEvent = (eventName, data) => {
  if (eventListeners[eventName]) {
    eventListeners[eventName].forEach((callback) => {
      callback(data);
    });
  }
};
