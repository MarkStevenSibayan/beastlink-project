import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminStudentsPage() {
  return (
    <PageLayout title="Student Management">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">All Students</h2>
        <div className="flex gap-2">
          <Input type="search" placeholder="Search students..." className="w-full sm:w-[300px]" />
          <Button className="bg-purple-600 hover:bg-purple-700">Add Student</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">ID</th>
                  <th className="px-4 py-2 text-left font-medium">Program</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Admission Date</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">John Smith</td>
                  <td className="px-4 py-3">2023CS1001</td>
                  <td className="px-4 py-3">Computer Science</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-500">Active</Badge>
                  </td>
                  <td className="px-4 py-3">Sep 10, 2023</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Suspend
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Sarah Johnson</td>
                  <td className="px-4 py-3">2023IT1002</td>
                  <td className="px-4 py-3">Information Technology</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-500">Active</Badge>
                  </td>
                  <td className="px-4 py-3">Sep 12, 2023</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Suspend
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">David Lee</td>
                  <td className="px-4 py-3">2023COE1003</td>
                  <td className="px-4 py-3">Computer Engineering</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-yellow-500">On Leave</Badge>
                  </td>
                  <td className="px-4 py-3">Sep 15, 2023</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Suspend
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Emily Wilson</td>
                  <td className="px-4 py-3">2023ACC1004</td>
                  <td className="px-4 py-3">Accountancy</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-red-500">Inactive</Badge>
                  </td>
                  <td className="px-4 py-3">Sep 18, 2023</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-emerald-500">
                        Reactivate
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
