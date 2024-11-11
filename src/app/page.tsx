import LoginSignUp from './components/LoginSignup/LoginSignup';
import CreateNewPost from './components/CreatePost/CreatePost';
export default function Home() {
  return (
    <div>
      {/*<LoginSignUp/>*/}
      <CreateNewPost/>
     
    </div>
    /*<div className="min-h-screen bg-white">
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Coming Soon</h1>
          <p className="text-lg text-gray-600">We're working on something amazing.</p>
        </div>
      </main>
    </div> */
  );
}
