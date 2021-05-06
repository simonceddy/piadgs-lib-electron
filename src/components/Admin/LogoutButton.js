function LogoutButton({ logOut }) {
  return (
    <button
      type="button"
      onClick={logOut}
      className="p-2 no-underline hover:underline border border-black rounded-md text-sm m-2"
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
