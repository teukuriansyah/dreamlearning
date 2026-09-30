package expo.modules.localstorage

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context
import android.content.SharedPreferences

class LocalstorageModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Localstorage")

    val sharedPref = getSharedPreferences("dreamLearning"), Context.MODE_PRIVATE)

    Function("getData") {
      val datas = sharedPref?.getString("data","No Data")
      return@Function datas
    }
    
    Function("postData") { data:String ->
      sharedPref?.edit().putString("data",data)
      return@Function "success"
    }
  }
}
