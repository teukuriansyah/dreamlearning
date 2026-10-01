package expo.modules.localstorage

import android.content.Context
import android.content.SharedPreferences
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class LocalstorageModule : Module() {
  private val context: Context?
    get() = appContext.reactContext

  private val sharedPref: SharedPreferences?
    get() = context?.getSharedPreferences("dreamLearning", Context.MODE_PRIVATE)

  override fun definition() = ModuleDefinition {
    Name("Localstorage")

    Function("getData") {
      return@Function sharedPref?.getString("data", "No Data") ?: "No Data"
    }

    Function("postData") { data: String ->
      sharedPref?.edit()?.putString("data", data)?.apply()
      return@Function "success"
    }
  }
}