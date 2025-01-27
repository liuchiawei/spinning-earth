useFrame((state, delta) => {
  if (!ref.current) return;
  // y軸隨時間和捲動旋轉
  const t = state.clock.getElapsedTime();
  ref.current.rotation.y = -t / 12 - scroll.offset * (Math.PI * 2); // Rotate contents
  if (state.events.update) {
    state.events.update(); // Raycasts every frame rather than on pointer-move
  }

  
  // 讓畫面隨著滑鼠指標移動
  easing.damp3(
    state.camera.position,
    // 鏡頭移動速度
    [-state.pointer.x / 2, state.pointer.y / 4, 3],
    0.5,
    delta
  ); // Move camera
  state.camera.lookAt(0, 0, 0); // Look at center
});

