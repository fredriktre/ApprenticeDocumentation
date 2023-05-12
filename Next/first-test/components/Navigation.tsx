import NavigationContent from "./NavigationContent";
import Card from '@/components/Card'

const Navigation = () => {
  return (
    <nav className="w-full py-10">
      <Card bg="bg-cyan-800" bordercolor="border-cyan-300" className="w-4/5 mx-auto font-bruno">
        <NavigationContent />
      </Card>
    </nav>
  )
}

export default Navigation