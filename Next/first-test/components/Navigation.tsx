import NavigationContent from "./NavigationContent";
import Card from '@/components/Card'

const Navigation = () => {
  return (
    <nav className="w-full pb-10">
      <Card bg="cyan-800" bordercolor="cyan-300" className="w-4/5 mx-auto font-bruno">
        <NavigationContent />
      </Card>
    </nav>
  )
}

export default Navigation